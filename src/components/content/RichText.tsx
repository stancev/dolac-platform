import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils'

type Props = {
  data: SerializedEditorState
  className?: string
}

export function RichText({ data, className }: Props) {
  return (
    <PayloadRichText
      data={data}
      className={cn(
        'space-y-5 text-body text-foreground',
        '[&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline',
        '[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
        '[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6',
        className,
      )}
    />
  )
}
