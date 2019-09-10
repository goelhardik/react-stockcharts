

import { slidingWindow } from "../utils";
import { Momentum as defaultOptions } from "./defaultOptionsForComputation";

export default function() {

	let options = defaultOptions;

	function calculator(data) {
		const { windowSize, sourcePath } = options;

		const priceDiff = slidingWindow()
			.windowSize(windowSize)
			.sourcePath(sourcePath)
			.accumulator(values => {
                return values[1] - values[0];
            });

		return priceDiff(data);
	}
	calculator.undefinedLength = function() {
		const { windowSize } = options;
		return windowSize - 1;
	};
	calculator.options = function(x) {
		if (!arguments.length) {
			return options;
		}
		options = { ...defaultOptions, ...x };
		return calculator;
	};

	return calculator;
}
