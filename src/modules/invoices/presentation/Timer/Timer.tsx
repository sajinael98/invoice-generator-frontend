import { Group, Stack, Text } from '@mantine/core';

interface Timer {
    time: number;
}

function convertSecondsToHMS(seconds: number) {
    // Calculate hours
    const hours = Math.floor(seconds / 3600);

    // Calculate minutes
    const minutes = Math.floor((seconds % 3600) / 60);

    // Calculate remaining seconds
    const remainingSeconds = seconds % 60;

    // Return the result as an object
    return {
        hours: hours,
        minutes: minutes,
        seconds: remainingSeconds
    };
}

function manpulateNum(num: number) {
    if (num < 10) {
        return "0" + String(num)
    }
    return String(num)
}

const Timer = ({  time}: Timer) => {
    

    const { hours, minutes, seconds } = convertSecondsToHMS(time)
    const secStr = manpulateNum(seconds).split("")
    const minStr = manpulateNum(minutes).split("")
    const hourStr = manpulateNum(hours).split("")
    return (
        <>
            <Group align='flex-end'>
                <Group spacing={5} align='flex-end'>
                    <Stack spacing={0} align='center'>
                        <Text size='xs' c='dimmed'>HOURS</Text>
                        <Group spacing={2}>
                            <Text bg='dark.7' w='20px' ta='center' style={{ borderRadius: 5 }} >{hourStr[0]}</Text>
                            <Text bg='dark.7' w='20px' ta='center' style={{ borderRadius: 5 }} >{hourStr[1]}</Text>
                        </Group>
                    </Stack>
                    <span>:</span>
                    <Stack spacing={0} align='center'>
                        <Text size='xs' c='dimmed'>MINUTES</Text>
                        <Group spacing={2}>
                            <Text bg='dark.7' w='20px' ta='center' style={{ borderRadius: 5 }} >{minStr[0]}</Text>
                            <Text bg='dark.7' w='20px' ta='center' style={{ borderRadius: 5 }} >{minStr[1]}</Text>
                        </Group>
                    </Stack>
                    <span>:</span>
                    <Stack spacing={0} align='center'>
                        <Text size='xs' c='dimmed'>SECONDS</Text>
                        <Group spacing={2}>
                            <Text bg='dark.7' w='20px' ta='center' style={{ borderRadius: 5 }} >{secStr[0]}</Text>
                            <Text bg='dark.7' w='20px' ta='center' style={{ borderRadius: 5 }} >{secStr[1]}</Text>
                        </Group>
                    </Stack>
                </Group>
            </Group>
           
        </>
    )
}

export default Timer