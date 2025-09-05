import React from 'react'

// Types pour les props du composant
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'purple' | 'green' | 'pink' | 'indigo'
  text?: string
  showText?: boolean
  className?: string
}

// Types pour les classes CSS
type SizeClasses = Record<NonNullable<LoaderProps['size']>, string>
type ColorClasses = Record<NonNullable<LoaderProps['color']>, string>

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'blue',
  text = 'Chargement...',
  showText = true,
  className = '',
}) => {
  const sizeClasses: SizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  }

  const colorClasses: ColorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    pink: 'border-pink-500',
    indigo: 'border-indigo-500',
  }

  const getInnerCircleSize = (
    size: NonNullable<LoaderProps['size']>,
  ): string => {
    const sizes = {
      sm: 'w-2 h-2',
      md: 'w-4 h-4',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    }
    return sizes[size]
  }

  const getTextSize = (size: NonNullable<LoaderProps['size']>): string => {
    const textSizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }
    return textSizes[size]
  }

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {/* Spinner principal */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 ${colorClasses[color]} border-t-transparent animate-spin`}
          role="status"
          aria-label="Chargement en cours"
        />

        {/* Cercle intérieur pour plus d'effet */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getInnerCircleSize(size)} bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-full animate-pulse`}
        />
      </div>

      {/* Texte de chargement */}
      {showText && (
        <div className="text-center">
          <p className={`text-gray-600 font-medium ${getTextSize(size)}`}>
            {text}
          </p>
          <div className="flex justify-center space-x-1 mt-2">
            <div
              className={`w-2 h-2 bg-${color}-500 rounded-full animate-bounce`}
            />
            <div
              className={`w-2 h-2 bg-${color}-500 rounded-full animate-bounce`}
              style={{ animationDelay: '0.1s' }}
            />
            <div
              className={`w-2 h-2 bg-${color}-500 rounded-full animate-bounce`}
              style={{ animationDelay: '0.2s' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Loader
