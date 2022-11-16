# @rbxts/attribute
A small attribute manager for Roblox TS.

```ts
import { Attributes } from "@rbxts/attribute"

const MyPart = new Instance("Part")

const AttributeManager = new Attributes(MyPart, {
    Speed: 52
})

AttributeManager.GetAttributeChangedSignal("Speed").Connect((Speed: number) => {
    print(`My new speed is ${Speed}!`)
})
```