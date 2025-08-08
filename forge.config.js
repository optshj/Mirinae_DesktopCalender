module.exports = {
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'optshj',
                    name: 'Mirinae_DesktopCalender'
                },
                prerelease: false,
                draft: true
            }
        }
    ]
}
