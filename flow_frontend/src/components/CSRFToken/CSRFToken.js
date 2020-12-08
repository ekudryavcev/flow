import React from "react";
import { getCookie } from "../../utilities";

export default class CSRFToken extends React.Component {
    constructor(props) {
        super(props);
        this.state = {csrftoken: getCookie("csrftoken")};
    }

    render() {
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={this.state.csrftoken} />
        );
    };
};