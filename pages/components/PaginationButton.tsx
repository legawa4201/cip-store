export default function PaginationButton({ pageState, nextPage }: { pageState: string, nextPage: (wantNext: boolean) => void }) {
    return <button onClick={() => nextPage( pageState === `>>`? true: false)} className="join-item btn">{pageState}</button>
}