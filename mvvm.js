class MVVM {
    constructor(option) {
        this.$el = option.el;
        this.$data = option.data
        if (this.$el) {
            new compile(this.$el, this)
        }
    }
}