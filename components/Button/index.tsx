import clsx from 'clsx'
import { useState } from 'react'
import { SpinnerCircularFixed } from 'spinners-react'

export enum ButtonAnimation {
  sm = 'sm',
  base = 'base',
  lg = 'lg',
  none = 'none'
}

export enum ButtonType {
  main,
  secondary
}

export enum ButtonIcon {
  inNewTab,
  share,
  none
}

type ButtonProps = {
  onClick: () => void
  text: string
  type?: ButtonType
  expanded?: boolean
  animation?: ButtonAnimation
  icon?: ButtonIcon
  loading?: boolean
}

const animationToClass: Record<ButtonAnimation, string> = {
  [ButtonAnimation.base]: 'animate-click',
  [ButtonAnimation.sm]: 'animate-click-sm',
  [ButtonAnimation.lg]: 'animate-click-lg',
  [ButtonAnimation.none]: ''
}

const Button = ({
  onClick,
  text,
  type = ButtonType.main,
  expanded = false,
  animation = ButtonAnimation.base,
  icon = ButtonIcon.none,
  loading = false
}: ButtonProps) => {
  const [onClickAnimation, setOnClickAnimation] = useState(false)

  return (
    <button
      onClick={() => {
        onClick()
        setOnClickAnimation(true)
      }}
      onAnimationEnd={() => setOnClickAnimation(false)}
      className={clsx(
        'rounded-2xl h-fit sm:h-12 px-8 py-3 sm:py-1',
        'transition ease-in-out duration-150',
        onClickAnimation && animationToClass[animation],
        expanded && 'min-w-full',
        type == ButtonType.main &&
          'bg-black-text text-white hover:scale-[1.01]',
        type == ButtonType.secondary &&
          'bg-white bg-opacity-60 text-grey-dark hover:scale-[1.025]'
      )}
    >
      <div className="flex flex-row justify-center items-center">
        <p className="font-black text-xl pt-px">{text}</p>
        <SpinnerCircularFixed
          className="ml-4"
          size={20}
          thickness={300}
          speed={150}
          color={type === ButtonType.main ? '#FFFFFF' : '#616161'}
          enabled={loading}
          secondaryColor={type === ButtonType.main ? '#616161' : '#C7C7C7'}
        />
        {icon === ButtonIcon.share && <ShareIcon type={type} />}
        {icon === ButtonIcon.inNewTab && <NewTabIcon type={type} />}
      </div>
    </button>
  )
}

export default Button

const ShareIcon = ({ type = ButtonType.main }: { type?: ButtonType }) => {
  return (
    <div className="pl-0.5">
      <svg
        className={clsx(
          type == ButtonType.main && 'stroke-white',
          type == ButtonType.secondary && 'stroke-grey-dark'
        )}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 9.5H14C14.5523 9.5 15 9.94772 15 10.5V16C15 16.5523 14.5523 17 14 17H6C5.44772 17 5 16.5523 5 16V10.5C5 9.94772 5.44772 9.5 6 9.5H7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 6.5L10 3M10 3L13.5 6.5M10 3V12.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

const NewTabIcon = ({ type = ButtonType.main }: { type: ButtonType }) => {
  return (
    <div className="pl-0.5">
      <svg
        className={clsx(
          type == ButtonType.main && 'fill-white',
          type == ButtonType.secondary && 'fill-grey-dark'
        )}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.0001 3C10.7349 3 10.4805 3.10536 10.293 3.29289C10.1054 3.48043 10.0001 3.73478 10.0001 4C10.0001 4.26522 10.1054 4.51957 10.293 4.70711C10.4805 4.89464 10.7349 5 11.0001 5H13.5861L7.29308 11.293C7.19757 11.3852 7.12139 11.4956 7.06898 11.6176C7.01657 11.7396 6.98898 11.8708 6.98783 12.0036C6.98668 12.1364 7.01198 12.2681 7.06226 12.391C7.11254 12.5139 7.18679 12.6255 7.28069 12.7194C7.37458 12.8133 7.48623 12.8875 7.60913 12.9378C7.73202 12.9881 7.8637 13.0134 7.99648 13.0123C8.12926 13.0111 8.26048 12.9835 8.38249 12.9311C8.50449 12.8787 8.61483 12.8025 8.70708 12.707L15.0001 6.414V9C15.0001 9.26522 15.1054 9.51957 15.293 9.70711C15.4805 9.89464 15.7349 10 16.0001 10C16.2653 10 16.5197 9.89464 16.7072 9.70711C16.8947 9.51957 17.0001 9.26522 17.0001 9V4C17.0001 3.73478 16.8947 3.48043 16.7072 3.29289C16.5197 3.10536 16.2653 3 16.0001 3H11.0001Z" />
        <path d="M5 5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V15C3 15.5304 3.21071 16.0391 3.58579 16.4142C3.96086 16.7893 4.46957 17 5 17H13C13.5304 17 14.0391 16.7893 14.4142 16.4142C14.7893 16.0391 15 15.5304 15 15V12C15 11.7348 14.8946 11.4804 14.7071 11.2929C14.5196 11.1054 14.2652 11 14 11C13.7348 11 13.4804 11.1054 13.2929 11.2929C13.1054 11.4804 13 11.7348 13 12V15H5V7H8C8.26522 7 8.51957 6.89464 8.70711 6.70711C8.89464 6.51957 9 6.26522 9 6C9 5.73478 8.89464 5.48043 8.70711 5.29289C8.51957 5.10536 8.26522 5 8 5H5Z" />
      </svg>
    </div>
  )
}
