"use client"

import Create from '@components/Create';
import { WorkerFormProvider, useWorkerForm } from '@modules/workers/infrastructure';
import { WorkerForm } from '@modules/workers/presentation';

const CreateWorkerPage = () => {
  const form = useWorkerForm()

  return (
    <Create saveButtonProps={form.saveButtonProps}>
      <WorkerFormProvider form={form as any}>
        <WorkerForm />
      </WorkerFormProvider>
    </Create>
  )
}

export default CreateWorkerPage