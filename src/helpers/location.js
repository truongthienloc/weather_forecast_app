import * as Location from 'expo-location'

export function getCurrentLocation() {
    const timeout = 10000
    return new Promise(async (resolve, reject) => {
        setTimeout(() => {
            reject(
                new Error(
                    `Error getting gps location after ${
                        (timeout * 2) / 1000
                    } s`,
                ),
            )
        }, timeout * 2)
        setTimeout(async () => {
            resolve(await Location.getLastKnownPositionAsync())
        }, timeout)
        resolve(await Location.getCurrentPositionAsync())
    })
}
