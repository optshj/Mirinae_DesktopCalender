import { app } from 'electron'
import { autoUpdater } from 'electron-updater'
import { dialog } from 'electron'

export const initAutoUpdater = () => {
    let shouldInstallOnDownload = false
    autoUpdater.autoInstallOnAppQuit = false
    autoUpdater.checkForUpdatesAndNotify()

    autoUpdater.on('update-available', (info) => {
        const message = ['업데이트 발견!', `${app.getVersion()} → ${info.version}`, '', `최신 버전이 나왔습니다. 지금 업데이트할까요?`].join('\n')
        dialog
            .showMessageBox({
                type: 'info',
                title: '업데이트 알림',
                message,
                buttons: ['지금 설치', '나중에'],
                defaultId: 0,
                cancelId: 1
            })
            .then((result) => {
                if (result.response === 0) {
                    shouldInstallOnDownload = true
                    autoUpdater.downloadUpdate()
                } else {
                    shouldInstallOnDownload = false
                }
            })
    })

    autoUpdater.on('update-downloaded', () => {
        if (shouldInstallOnDownload) autoUpdater.quitAndInstall()
    })
    autoUpdater.on('error', (err) => console.error('업데이트 오류:', err))
}
