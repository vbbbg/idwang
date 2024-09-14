'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 定义手机号的正则表达式
const phoneRegex = /^1[3-9]\d{9}$/

// 创建 zod schema
const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, '手机号不能为空')
    .regex(phoneRegex, '请输入有效的手机号'),
  password: z
    .string()
    .min(8, '密码长度必须大于 8 位')
    .regex(/[a-zA-Z]/, '密码必须包含字母')
    .regex(/\d/, '密码必须包含数字'),
})

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <div className="text-black">
      <Form<z.infer<typeof formSchema>> {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>手机号</FormLabel>
                  <FormControl>
                    <Input maxLength={11} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
            name="phoneNumber"
          />
          <FormField
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="mt-[10px]">
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
            name="password"
          />

          <Button type="submit" className="mt-[10px]">
            提交
          </Button>
        </form>
      </Form>
    </div>
  )
}
