"use client";

import * as z from "zod";
import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSession } from 'next-auth/react';
import React, { useState, useTransition } from 'react'
import { useForm } from "react-hook-form";
import { SettingsNameSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const SettingsPage = () => {
  const user = useCurrentUser();
  const {update} = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingsNameSchema>>({
    resolver: zodResolver(SettingsNameSchema),
    defaultValues: {
      name: user?.name || undefined,
    }
  });

  const onSubmit=(values: z.infer<typeof SettingsNameSchema>)=>{
    startTransition(()=>{
      setError(undefined);
      setSuccess(undefined);
      settings(values)
      .then((data)=>{
        if(data.error){
          setError(data.error)
        }

        if(data.success){
          update();
          setSuccess(data.success);
        }
      })
      .catch(()=>setError("Something went wrong!"))
    })
  }

  return (
    <div className="overflow-x-hidden dark:bg-black/90 h-screen flex flex-col items-center justify-center" >
   <Card className=' w-[350px] md:w-[600px] dark:bg-muted-foreground dark:text-black ' >
    <CardHeader>
      <p className='text-2xl font-semibold text-center' >
        Settings
      </p>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>

          <FormField
            control={form.control}
            name="name"
            render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} >
            {isPending ? "Saving" : "Save"}
          </Button>
        </form>
      </Form>
    </CardContent>
   </Card>
   </div>
  )
}

export default SettingsPage