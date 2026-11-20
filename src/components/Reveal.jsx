import { useReveal } from '../hooks'

/** Wrapper that fades/slides its content in when scrolled into view. */
export default function Reveal({ as: Tag = 'div', className = '', style, children, ...rest }) {
  const [ref, state] = useReveal()
  const cls = ['rv', className, state === 'pre' && 'rv-pre', state === 'in' && 'in'].filter(Boolean).join(' ')
  return <Tag ref={ref} className={cls} style={style} {...rest}>{children}</Tag>
}
