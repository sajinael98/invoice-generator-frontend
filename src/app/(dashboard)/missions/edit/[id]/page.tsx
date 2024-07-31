"use client"

import Edit from '@components/Edit'
import { MissionProvider, useMissionForm } from '@modules/missions/infrastructure'
import { MissionForm } from '@modules/missions/presentation'

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