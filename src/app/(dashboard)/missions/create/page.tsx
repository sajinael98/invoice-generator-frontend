"use client"

import { MissionProvider, useMissionForm } from '@modules/missions/infrastructure'
import { MissionForm } from '@modules/missions/presentation'
import { Create } from '@refinedev/mantine'

const CreateMissionPage = () => {
    const form = useMissionForm()
    return (
        <Create saveButtonProps={form.saveButtonProps}>
            <MissionProvider form={form as any}>
                <MissionForm />
            </MissionProvider>
        </Create>
    )
}

export default CreateMissionPage