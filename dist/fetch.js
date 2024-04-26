async function fetchData(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        if (response.ok)
            return json;
        else
            throw new Error("Erro: " + response.status);
    }
    catch (e) {
        if (e instanceof Error)
            console.log(e.message);
        return null;
    }
}
export default fetchData;
//# sourceMappingURL=fetch.js.map