export default ({ keyBindings = () => ({}) }) => {
  return {
    bindings: {
      ...keyBindings(),
    },
  }
}
