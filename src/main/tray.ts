import { app, Menu, nativeImage, Tray } from 'electron'
import { attach, detach } from 'electron-as-wallpaper'
import { join } from 'path'
import { mainWindow } from '.'

export function initTray() {
    const iconPath = app.isPackaged ? join(process.resourcesPath, 'resources/icon.png') : join(__dirname, '../../resources/icon.png')
    const image = nativeImage.createFromPath(iconPath)
    const tray = new Tray(image)

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '열기',
            click: (): void => {
                mainWindow?.show()
            }
        },
        {
            label: '종료',
            role: 'quit'
        }
    ])
    tray.setToolTip('미리내')
    tray.setContextMenu(contextMenu)
    contextMenu.on('menu-will-show', () => {
        detach(mainWindow)
    })
    contextMenu.on('menu-will-close', () => {
        attach(mainWindow, {
            forwardKeyboardInput: true,
            forwardMouseInput: true
        })
    })
}
