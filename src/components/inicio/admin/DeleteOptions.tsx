'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteCurso } from '@/lib/actions';
import { State } from '@/lib/definitions';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Loader2 } from 'lucide-react';

export function DeleteCurso(
  { id, onDelete, isDeleting, setIsDeleting }:
    { id: string | undefined, onDelete: (result: State) => void, isDeleting: boolean, setIsDeleting: (value: boolean) => void }
) {

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      const result = await deleteCurso(id);
      onDelete(result);
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" className="mt-auto" disabled={!id || isDeleting}>
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Eliminando...
            </>
          ) : (
            'Eliminar Cursado'
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <ExclamationCircleIcon className="w-8 h-8 mr-2 text-red-600" />
            Eliminar curso
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Seguro que quieres eliminar este curso?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}