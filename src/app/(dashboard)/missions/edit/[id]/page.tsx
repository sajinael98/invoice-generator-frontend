"use client"

import { MissionProvider, useMissionForm } from '@modules/missions/infrastructure'
import { MissionForm } from '@modules/missions/presentation'
import { Edit } from '@refinedev/mantine'

const UpdateMissionPage = () => {
    const form = useMissionForm()
    return (
        <Edit saveButtonProps={form.saveButtonProps}>
            <MissionProvider form={form as any}>
                <MissionForm />
            </MissionProvider>
        </Edit>
    )
}

export default UpdateMissionPage