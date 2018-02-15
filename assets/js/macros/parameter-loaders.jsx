import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/parameter-loaders
`

const example1Before = `
class Proxy {
    private $factory;

    private $formatter;

    public function __construct(
        <strong>Factory $factory = app("factory"),
        Formatter $formatter = new ProxyFormatter("default")</strong>
    ) {
        $this->factory = $factory;
        $this->formatter = $formatter;
    }
}
`

const example1After = `
class Proxy {
    private $factory;

    private $formatter;

    public function __construct(
        <strong>Factory $factory = null,
        Formatter $formatter = null</strong>
    ) {
        <strong>if (is_null($factory)) {
            $factory =  app("factory");
        }

        if (is_null($formatter)) {
            $formatter = new ProxyFormatter("default");
        }</strong>

        $this->factory = $factory;
        $this->formatter = $formatter;
    }
}
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="parameter-loaders">Parameter Loaders</h2>
            </Column>
        </Row>
        <Row>
            <Column>
                <CodeBlock code={install} />
            </Column>
        </Row>
        <Row>
            <Column>Then, use it in your code:</Column>
        </Row>
        <Row>
            <Column>
                <CodeBlock code={example1Before} />
            </Column>
        </Row>
        <Row>
            <Column>This compiles to code resembling:</Column>
        </Row>
        <Row>
            <Column>
                <CodeBlock code={example1After} />
            </Column>
        </Row>
    </div>
)
