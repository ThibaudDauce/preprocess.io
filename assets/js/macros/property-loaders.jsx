import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/property-loaders
`

const example1Before = `
class Proxy {
    private $factory = <strong>app("factory");</strong>

    private $formatter = <strong>new ProxyFormatter("default");</strong>

    public function execute() {
        $instance = <strong>$this->factory</strong>->make();
        return <strong>$this->formatter</strong>->format($instance->execute());
    }
}
`

const example1After = `
class Proxy {
    <strong>use \Pre\PropertyLoaders\PropertyLoadersTrait;

    private $factory;

    private function loadFactoryProperty() {
        $this->factory = app("factory");
    }

    private $formatter;

    private function loadFormatterProperty() {
        $this->formatter = new ProxyFormatter("default");
    }</strong>

    public function execute() {
        $instance = <strong>$this->factory</strong>->make();
        return <strong>$this->formatter</strong>->format($instance->execute());
    }
}
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="property-loaders">Property Loaders</h2>
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
