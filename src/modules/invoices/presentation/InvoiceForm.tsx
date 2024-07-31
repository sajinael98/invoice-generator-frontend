import { Input, Select, SimpleGrid, TextInput } from '@mantine/core'
import { DatePicker, TimeInput } from '@mantine/dates'
import { City } from '@modules/customers/types'
import { useSelect } from '@refinedev/mantine'
import { useEffect, useMemo } from 'react'
import { useInvoiceFormContext } from '../infrastructure'
import ItemsTable from './ItemsTable/ItemsTable'

const InvoiceForm = () => {
    const { getInputProps, values, setValues } = useInvoiceFormContext()

    const { selectProps, queryResult } = useSelect({
        resource: 'customers',
        optionLabel: (item: any) => `${item.firstName} ${item.lastName}`,
        optionValue: (item) => item.id,
        onSearch(value) {
            if (value) {
                const splitedValue = value.split(" ");
                switch (splitedValue.length) {
                    case 1: {
                        return [
                            {
                                field: 'firstName',
                                operator: 'eq',
                                value
                            }
                        ]
                    }
                    case 2: {
                        return [
                            {
                                field: 'firstName',
                                operator: 'eq',
                                value: splitedValue[0]
                            },
                            {
                                field: 'lastName',
                                operator: 'eq',
                                value: splitedValue[1]
                            }
                        ]
                    }
                }
            }
            return [

            ]
        },
    })
    const customerId = (values as any)?.customerId
    const selectedCustomer = useMemo(() => queryResult.data?.data.find(customer => customer.id === customerId), [customerId, queryResult.data?.data])

    const cities = [{ value: City.RAMALLAH, label: City.RAMALLAH }, { value: City.NABLUS, label: City.NABLUS }]

    useEffect(() => {
        if (selectedCustomer) {
            setValues({
                phone: selectedCustomer.phone,
                email: selectedCustomer.email
            })
        }
    }, [selectedCustomer])

    return (
        <>
            <SimpleGrid
                breakpoints={[
                    { maxWidth: 700, cols: 1, spacing: 'md' },
                    { minWidth: 700, cols: 2, spacing: 'md' },
                ]}
            >
                <Select
                    label='Customers'
                    {...getInputProps('customerId')}
                    {...selectProps}
                />
                <br />
                <TextInput
                    label='Phone'
                    {...getInputProps('phone')}
                />
                <TextInput
                    label='Email'
                    {...getInputProps('email')}
                />

                <DatePicker
                    label='Invoice Date'
                    {...getInputProps('invoiceDate')}
                />
                <br />
                <DatePicker
                    label='Required Date'
                    {...getInputProps('requiredDate')}
                />
                <Input.Wrapper
                    label='Required Time'
                    error={getInputProps('requiredTime').error}
                >
                    <Input
                        type='time'
                        {...getInputProps('requiredTime')} />
                </Input.Wrapper>
                <Select
                    label='City'
                    data={cities}
                    {...getInputProps('city')}
                />
            </SimpleGrid>
            <ItemsTable />
        </>
    )
}

export default InvoiceForm