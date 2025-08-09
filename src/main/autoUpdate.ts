import { autoUpdater } from 'electron-updater'
import { dialog } from 'electron'

export const initAutoUpdater = () => {
    autoUpdater.checkForUpdatesAndNotify()

    autoUpdater.on('update-available', () => {
        dialog
            .showMessageBox({
                type: 'info',
                title: '업데이트 발견',
                message: '새 버전이 발견되었습니다. 업데이트하시겠습니까?',
                buttons: ['예', '아니오']
            })
            .then((result) => {
                if (result.response === 0) autoUpdater.downloadUpdate()
            })
    })

    autoUpdater.on('update-downloaded', () => {
        dialog
            .showMessageBox({
                type: 'info',
                title: '업데이트 다운로드 완료',
                message: '앱을 재시작하여 업데이트를 적용합니다.'
            })
            .then(() => autoUpdater.quitAndInstall())
    })

    autoUpdater.on('error', (err) => console.error('업데이트 오류:', err))
}
