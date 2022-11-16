export type Has<T extends string | number | symbol, C> = {
	[_ in T]: C
}