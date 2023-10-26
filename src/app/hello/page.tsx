export default async function HelloPage() {
    await new Promise((resolve)=> setTimeout(resolve, 1000));
    // throw Error("Bazinga")
    return (
        <div>Hello, NextJS 13!</div>
    );
}
