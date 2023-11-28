export default function PaginationButton({ pageState, nextPage }: { pageState: string }) {
    return <button onClick={() => nextPage( pageState === `>>`? true: false)} className="join-item btn">{pageState}</button>
}