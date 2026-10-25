import { memo, type JSX } from 'react'
import { Svg, Line, Path, type SvgProps } from 'react-native-svg'
import { themed, type IconProps } from '@tamagui/helpers-icon'

export const UnderlineIcon: (props: IconProps) => JSX.Element = themed(
  memo(function UnderlineIcon(props: IconProps) {
    const { color = 'black', size = 24, ...otherProps } = props as SvgProps & {
      color?: string
      size?: number
    }
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...otherProps}
      >
        <Path d="M6 4v6a6 6 0 0 0 12 0V4" stroke={color} />
        <Line x1="4" x2="20" y1="20" y2="20" stroke={color} />
      </Svg>
    )
  })
)
