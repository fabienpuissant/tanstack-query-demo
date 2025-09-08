# TanStack Query avec React

Gestion moderne des données asynchrones

Démonstration avec une application TodoList

Presentation html **presentation/index.html**


---

## Qu'est-ce que TanStack Query ?

- Anciennement React Query - rebaptisé pour supporter d'autres frameworks
- Librairie de gestion d'état serveur pour React
- Simplifie les appels API et la synchronisation des données
- Cache intelligent et automatique des réponses
- Gestion avancée des erreurs et stratégies de retry
- Optimisations de performance (background updates, stale-while-revalidate)
- DevTools intégrés pour le debugging


---

## 📋Notre projet : TodoList

### 📄Lister les tâches

### ➕Ajouter une tâche

### ✅Marquer terminée

### 🗑️Supprimer

Une application simple pour démontrer les concepts clés

useQuery pour récupérer et cacher les todos

useMutation pour créer de nouveaux todos

useMutation pour modifier le statut

useMutation pour effacer des todos


---

## 🔍Les Queries

Pour récupérer et mettre en cache les données du serveur

- queryKey : identifiant unique pour le cache
- queryFn : fonction asynchrone qui récupère les données
- États automatiques : loading, error, success

```javascript
const {
  data: todos,
  isLoading,
  error,
  refetch,
  isFetching
} = useQuery({
  queryKey: ['todos'],
  queryFn: () => repository.getTodos()
})
```


---

## 📊États de chargement et d'erreur

### isLoading

### isFetching

### isStale

### isError

Premier chargement, aucune donnée en cache

Refetch en arrière-plan (données déjà en cache)

Données considérées comme obsolètes

Erreur lors de la récupération des données

```javascript
function TodoList() {
  const {
    data: todos,
    isLoading,
    isFetching,
    error,
    refetch
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })

  if (isLoading) {
    return <div className="spinner">Chargement initial...</div>
  }

  if (error) {
    return (
      <div className="error">
        <p>Erreur: {error.message}</p>
        <button onClick={() => refetch()}>Réessayer</button>
      </div>
    )
  }

  return (
    <div>
      {isFetching && <div className="fetching">Mise à jour...</div>}
      <ul>
        {todos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

```


---

## ✏️Les Mutations

Pour modifier les données côté serveur (POST, PUT, DELETE)

- mutationFn : fonction qui exécute la mutation
- onSuccess : callback appelé en cas de succès
- onError : gestion des erreurs
- États : isLoading, error, isSuccess

```javascript
const addTodoMutation = useMutation({
  mutationFn: (todo: Todo) => repository.addTodo(todo),
  onSuccess: () => {
    refreshTodos()
    toast.success('Tâche ajoutée !')
  },
  onError: (error) => {
    toast.error("Erreur lors de l'ajout")
  }
})

// Utilisation
const handleSubmit = (todo: Todo) => {
  addTodoMutation.mutate(todo)
}
```


---

## 🔄Invalidation des Queries

Synchroniser automatiquement les données après une mutation

- Synchronisation automatique de toutes les vues
- Refetch intelligent des données modifiées
- Pattern matching pour invalider plusieurs queries
- Mise à jour manuelle du cache pour éviter les refetch

```javascript

const queryClient = useQueryClient();

// Invalider une query spécifique
queryClient.invalidateQueries(['todos'])

// Invalider plusieurs queries avec un pattern
queryClient.invalidateQueries({ queryKey: ['todos'] })

// Dans une mutation
const deleteTodoMutation = useMutation({
  mutationFn: deleteTodo,
  onSuccess: (deletedTodo) => {
    queryClient.invalidateQueries(['todos'])
  }
})
```


---

## 🔁Gestion des Retry

Résilience automatique face aux erreurs réseau

- Retry automatique configurable par query
- Délai exponentiel pour éviter la surcharge serveur
- Conditions personnalisées selon le type d'erreur
- Applicable aux queries ET aux mutations

```javascript
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  retry: 3,
  retryDelay: (attemptIndex) => {
    // Délai exponentiel: 1s, 2s, 4s...
    return Math.min(1000 * 2 ** attemptIndex, 30000)
  }
})

const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  retry: (failureCount, error) => {
    if (error.status === 404 || error.status === 403) {
      return false
    }
    // Retry maximum 3 fois pour les autres erreurs
    return failureCount < 3
  }
})

// Pour les mutations aussi
const mutation = useMutation({
  mutationFn: createTodo,
  retry: 2,
  retryDelay: 1000
})
```


---

## ⚡Optimistic Updates

Mise à jour immédiate de l'UI pour une meilleure expérience utilisateur

```javascript
const toggleTodoMutation = useMutation({
  mutationFn: (updatedTodo) => repository.toggleTodo(updatedTodo),

  onMutate: async (updatedTodo) => {
    // 1. Annuler tous les refetch en cours pour éviter les conflits
    await queryClient.cancelQueries(['todos'])

    // 2. Sauvegarder l'état actuel pour pouvoir revenir en arrière
    const previousTodos = queryClient.getQueryData(['todos'])

    // 3. Mise à jour optimiste du cache
    queryClient.setQueryData(['todos'], (oldTodos) =>
      oldTodos.map(todo =>
        todo.id === updatedTodo.id
          ? { ...todo, completed: updatedTodo.completed }
          : todo
      )
    )

    // Retourner le context pour onError
    return { previousTodos }
  },

  onError: (error, updatedTodo, context) => {
    // Rollback en cas d'erreur
    if (context?.previousTodos) {
      queryClient.setQueryData(['todos'], context.previousTodos)
    }
    toast.error('Erreur lors de la mise à jour')
  }
})
```


---

## ⚙️Configuration globale

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Données considérées fraîches pendant 5 minutes
      // => Si on a un re-render ou refetchOnWindowFocus les données seront lues du cache
      staleTime: 5e3,
      // Temps de conservation des données dans le cache
      gcTime: 10e3,
      retry: 2,
      // Refetch lors du focus de la fenêtre
      refetchOnWindowFocus: true
    },
    mutations: {
      retry: 1
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  )
}
```


---

## 🛠️DevTools

- Inspection en temps réel du cache
- Visualisation de toutes les queries et mutations
- États détaillés : loading, error, stale, fresh
- Chronologie des invalidations et refetch
- Actions manuelles : refetch, invalidate, remove
- Debugging facilité avec données structurées


---

## 🎯Pourquoi TanStack Query ?

### 🚀Performance

### 🔧Developer Experience

### 🛡️Robustesse

### ⚡UX

Cache intelligent, background updates, déduplication des requêtes

DevTools intégrés, TypeScript natif, API intuitive

Retry automatique, gestion d'erreurs

Optimistic updates, états de loading précis

🎉 Moins de code boilerplate, plus de fonctionnalités robustes !

Remplace useState + useEffect + gestion manuelle des erreurs


---
