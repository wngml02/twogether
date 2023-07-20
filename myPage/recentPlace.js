export type RecentPlace = {
    idx: number;
    photo: string;
    name: string;
};

useEffect(() => {
    if (!product) return;

    const previousWatched: RecentPlace[] = JSON.parse(
    localStorage.getItem("watched") || "[]"
    );
    if (!Array.isArray(previousWatched)) return;

    let currentWatched: RecentPlace[] = [];
    const targetIndex = previousWatched.findIndex(
    (watched) => watched.idx === product.idx
    );

    // 처음 보는 장소라면
    if (targetIndex === -1) {
        const { idx, photo, name, ...rest } = product;
        currentWatched = [{ idx, photo, name }, ...previousWatched];
    }
    // 최근에 본적이 있는 장소라면
    else {
        const target = previousWatched.splice(targetIndex, 1);
        currentWatched = [...target, ...previousWatched];
        }

    // 목록이 10개가 넘으면 자르기
    if (currentWatched.length > 10) currentWatched.pop();
        localStorage.setItem("watched", JSON.stringify(currentWatched));

}, [product]);