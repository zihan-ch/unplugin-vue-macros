import { foo } from './foo'
import type { DefineComponent } from 'vue'

console.log(foo)

const name = 'Greet'
defineOptions({
  name,
})

defineProps<{
  title?: string
}>()

defineEmits<
  SE<{
    change: [value: string]
    submit(name: string): void
  }>
>()

defineModel<{
  modelValue: string
}>()

export default (
  <div>
    <h1>{name}</h1>
    Magic Vue!
  </div>
) as any as DefineComponent
