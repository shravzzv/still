import { Text, TextProps } from 'react-native'

type AppTextProps = TextProps & {
  className?: string
}

export function AppText({ className, ...props }: AppTextProps) {
  return <Text className={`font-sans ${className ?? ''}`} {...props} />
}
