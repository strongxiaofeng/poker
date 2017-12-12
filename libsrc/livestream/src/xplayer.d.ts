declare class XPlayer {
	public id:any;
	public ready:boolean;
	public init(canvas:any):void;
	public play():void;
	public stop():void;
	public seek():void;
	public resume():void;
	public pause():void;
	public getCurrentTime():number;
	public getDuration():number;
	public setSourceUrl(value:any):void;
	public setStatusListener(value:any):void;
	constructor(id);
}