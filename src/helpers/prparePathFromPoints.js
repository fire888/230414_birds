export const preparePathFromPoints = (model) => {
    const arr = []
    for (let i = 0; i < model.children.length; ++i) {
        arr.push({
            n: +model.children[i].name.split('_')[1],
            p: model.children[i].position.clone(),
            q: model.children[i].quaternion.clone()
        })
    }
    const sorted = arr.sort((a,b) => a.n - b.n)
    return sorted
}
