export type TimcamCountEvent = {
	camera: string;
	roi_name: string;
	roi: Array<[number, number]>;
	count: number;
	smoothed_count: number;
	smoothing_type: string;
	timestamp: number;
	timestamp_iso: string;
	sequence: number;
};
