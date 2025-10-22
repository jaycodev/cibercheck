import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { PasswordInput } from '@/components/ui/password-input'
import { cn } from '@/lib/utils'

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Portal de Docentes</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresa con tu cuenta institucional Cibertec para registrar asistencias
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Usuario Cibertec</FieldLabel>
          <InputGroup>
            <InputGroupInput id="email" placeholder="Ingresa tu usuario" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>@cibertec.edu.pe</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <PasswordInput
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </Field>
        <Field>
          <Button asChild>
            <Link href="/">Iniciar sesión</Link>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
