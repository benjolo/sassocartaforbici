import create from 'zustand';

interface Moves {
    id: number;
    name: string;
    image: string;
}

export interface Result {
    winner: string;
    outcome: string;
    loser: string;
}

interface MovesStore {
    filter: string;
    moves: Moves[];
    movesFiltred: Moves[];
    choosedmove: Moves;
    result: Result;
    computerMove: Moves;
    fetchOk: boolean;
    getMoves: () => Moves[];
    getChoosedMove: () => Moves;
    updateMoves: (moves: Moves) => void;
    updateMovesFiltred: (moves: Moves[]) => void;
    getMovesFiltred: () => Moves[];
    chooseMove: (id: number) => void;
    setResult: (result: Result) => void;
    getResult: () => Result;
    setComputerMove: (computerMove: number) => void;
    getComputerMove: () => Moves;
    setFilter: (filter: string) => void;
}

export const useMovesStore = create<MovesStore>((set, get) => ({
    filter: '',
    moves: [],
    movesFiltred: [],
    choosedmove: { id: 0, name: '', image: '' },
    result: { winner: '', outcome: '', loser: '' },
    computerMove: { id: 0, name: '', image: '' },
    fetchOk: false,
    getMoves: () => get().moves,
    getChoosedMove: () => get().choosedmove,
    updateMoves: (moves: Moves) => set((state) => ( { moves: [...state.moves, moves] })),
    updateMovesFiltred: (moves: Moves[]) => set((state) => ( { movesFiltred: moves })),
    chooseMove: (id: number) => set((state) => ({ choosedmove: state.moves.find((move) => move.id === id) })),
    getMovesFiltred: () => get().movesFiltred,
    setResult: (result: Result) => set((state) => ({ result: { ...state.result, ...result } })),
    getResult: () => get().result,
    setComputerMove: (id: number) => set((state) => ({ computerMove: state.moves.find((move) => move.id === id) })),
    getComputerMove: () => get().computerMove,
    setFilter: (filter: string) => set((state:any) => ({
        ...state,
        filter,
      })),
}));
