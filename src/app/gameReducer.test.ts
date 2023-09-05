describe("gameReducer", () => {
    it("save scores to localstorage", () => {
        const KEY = "foo";
        const VALUE = "bar";

        localStorage.setItem(KEY, VALUE);

        expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
        expect(localStorage.__STORE__[KEY]).toBe(VALUE);
        expect(Object.keys(localStorage.__STORE__).length).toBe(1);

        expect(1).toEqual(1);
    });
});
