export const state = () => ({
  CommonPage: 'common_page',
  isSwitching: false,
  isHeaderMenu: false,
  headerLineup: [
    { type: 'ABOUT', url: '/about/' },
    { type: 'SKILL', url: '/skill/' },
    { type: 'WORKS', url: '/works/' },
    { type: 'CONTACT', url: '/contact/' },
    { type: 'TOP', url: '/' }
  ]
})

export const mutations = {
  // layout1
  toggleSwitching (state) {
    state.isSwitching = !state.isSwitching
  },
  toggleHeaderMenu (state) {
    state.isHeaderMenu = !state.isHeaderMenu
  }
}
