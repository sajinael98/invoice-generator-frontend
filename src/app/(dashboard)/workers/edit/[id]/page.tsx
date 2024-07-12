"use client"

import { WorkerFormProvider, useUpdateWorker } from '@modules/workers/infrastructure'
import { WorkerForm } from '@modules/workers/presentation'
import { Edit } from '@refinedev/mantine'

const EditWorkerPage = () => {
    const form = useUpdateWorker()
    
    return (
        <Edit saveButtonProps={form.saveButtonProps}>
            <WorkerFormProvider form={form as any}>
                <WorkerForm />
            </WorkerFormProvider>
        </Edit>
    )
}

export default EditWorkerPage