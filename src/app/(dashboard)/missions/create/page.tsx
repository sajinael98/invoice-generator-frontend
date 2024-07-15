"use client"

import { MissionProvider, useCreateMission } from '@modules/missions/infrastructure'
import {MissionForm} from '@modules/missions/presentation'
import { Create } from '@refinedev/mantine'
import React from 'react'

const CreateMissionPage = () => {
    const form = useCreateMission()

    return (
        <Create saveButtonProps={form.saveButtonProps}>
            <MissionProvider form={form as any}>
                <MissionForm />
            </MissionProvider>
        </Create>
    )
}

export default CreateMissionPage