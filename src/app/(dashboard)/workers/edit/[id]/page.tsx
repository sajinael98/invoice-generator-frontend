"use client"

import Edit from '@components/Edit'
import { WorkerFormProvider, useWorkerForm } from '@modules/workers/infrastructure'
import { WorkerForm } from '@modules/workers/presentation'
import React from 'react'

const page = () => {
    const form = useWorkerForm()
    
    return (
        <Edit saveButtonProps={form.saveButtonProps}>
            <WorkerFormProvider form={form as any}>
                <WorkerForm />
            </WorkerFormProvider>
        </Edit>
    )
}

export default page