"use client"

import { Select, SimpleGrid, TextInput } from '@mantine/core'
import { useCustomerFormContext } from '../infrastructure'
import { City } from '../types'

const CustomerForm = () => {
    const { getInputProps } = useCustomerFormContext()
    
    return (
        <SimpleGrid px='xl' cols={2}>
            <div>
                <TextInput
                    label='First Name'
                    {...getInputProps('firstName')}
                />
            </div>
            <div>
                <TextInput
                    label='Last Name'
                    {...getInputProps('lastName')}
                />
            </div>
            <div>
                <Select
                    label='City'
                    data={Object.values(City).map(city => ({ label: city, value: city.toUpperCase() }))}
                    withinPortal
                    {...getInputProps('city')}
                />
            </div>
            <div>
                <TextInput
                    label='Address'
                    {...getInputProps('address')}
                />
            </div>
            <div>
                <TextInput
                    label='Phone'
                    {...getInputProps('phone')}
                />
            </div>
            <div>
                <TextInput
                    label='Email'
                    {...getInputProps('email')}
                />
            </div>
        </SimpleGrid>
    )
}

export default CustomerForm