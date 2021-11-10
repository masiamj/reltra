/**
 * This module exposes a small API of platform-specific utilities while
 * hiding the actual implementation details.
 *
 * This is a basic example of how we build our own layers of abstraction
 * atop libraries and implementations that may change in the future.
 *
 * This protects us from major refactors and breaking changes as consumers of our exposed
 * interface don't have to concern themselves with underlying resources.
 */

import { Platform } from 'react-native'

export const isiOS = () => Platform.OS === 'ios'
