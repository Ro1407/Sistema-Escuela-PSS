import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export default function Component() {
  return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="flex flex-col sm:flex-row items-center gap-2">
				<label htmlFor="search" className="text-sm font-medium text-muted-foreground whitespace-nowrap mb-2 sm:mb-0">
					Buscar usuario:
				</label>
				<div className="relative w-full">
					<Input
						id="search"
						placeholder="Ingrese un dato del usuario"
						className="w-full pr-10"
					/>
					<Button
						type="submit"
						size="sm"
						className="absolute right-0 top-0 h-full rounded-l-none"
					>
						<SearchIcon className="h-4 w-4" />
						<span className="sr-only">Buscar usuario</span>
					</Button>
				</div>
			</div>
		</div>
  )
}