import Signal from "@rbxts/signal"
import { Has } from "./Utils"

export class Attributes<T extends Record<string,AttributeValue> = { }> {
	public Values: T

	public AttributeChanged = new Signal<(AttributeName: string, AttributeValue?: AttributeValue) => void>()

	public constructor(
		public Instance: Instance,
		public Defaults: T
	) {
		this.Values = Defaults

		this.Instance.GetAttributes().forEach((AttributeValue: AttributeValue, AttributeName: string) => {
			(this.Values as Has<string, typeof AttributeValue>)[AttributeName] = AttributeValue
		})

		this.Instance.AttributeChanged.Connect((AttributeName: string) => {
			const AttributeValue = this.Instance.GetAttribute(AttributeName)

			this.AttributeChanged.Fire(AttributeName, AttributeValue)

			;(this.Values as Has<string, typeof AttributeValue>)[AttributeName] = AttributeValue
		})
	}

	public GetAttributeChangedSignal<C extends keyof T>(AttributeName: C): Signal<(AttributeValue: T[C]) => void> {
		const AttributeChangedSignal = new Signal<(AttributeValue: T[C]) => void>()

		this.AttributeChanged.Connect((TargetAttributeName: string, AttributeValue?: AttributeValue) => {
			if(TargetAttributeName !== AttributeName) return

			AttributeChangedSignal.Fire(AttributeValue as T[C])
		})

		return AttributeChangedSignal
	}
}