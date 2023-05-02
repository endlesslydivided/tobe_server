import DBQueryParameters from "../../requestFeatures/dbquery.params";

export default class UsersParams extends DBQueryParameters
{

    constructor()
    {
        super();
    }

    public sex?:'man'|'woman'| "" = "";

    public search?:string = '';

    public havePhoto?:boolean = false;

    public country?:string = '';

}