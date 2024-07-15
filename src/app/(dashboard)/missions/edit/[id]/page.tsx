"use client"

import { MissionProvider, useUpdateMission } from '@modules/missions/infrastructure'
import { MissionForm } from '@modules/missions/presentation'
import { Edit } from '@refinedev/mantine'

const UpdateMissionPage = () => {
    const form = useUpdateMission()
    return (
        <Edit saveButtonProps={form.saveButtonProps}>
            <MissionProvider form={form as any}>
                <MissionForm />
            </MissionProvider>
        </Edit>
    )
}

export default UpdateMissionPage