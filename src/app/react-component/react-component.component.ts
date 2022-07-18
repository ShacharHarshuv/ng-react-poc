import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit,
  TemplateRef,
  EmbeddedViewRef,
} from '@angular/core';
import * as ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';
import * as React from 'react';
import { ReactNode } from 'react';

function nativeNodeToReactComponent(element: Node) {
  return class NativeElementWrapper extends React.Component {
    override componentDidMount() {
      super.componentDidMount?.();
      const container = findDOMNode(this);
      container?.appendChild(element);
    }

    override render(): ReactNode {
      return React.createElement('div'); // todo: see if we can return an empty node instead
    }
  }
}

@Component({
  selector: 'app-react-component',
  template: '',
})
export class ReactComponentComponent<GProps, GComponent extends React.FC<GProps> | React.ComponentClass<GProps>> implements OnChanges {
  constructor(
    private _eRef: ElementRef<HTMLElement>,
  ) {
  }

  @Input()
  component: GComponent;

  @Input()
  props: GProps = {} as GProps; // todo: if props not provided, consider throwing exception instead of casting

  // todo: consider if there is really a need for this input
  @Input()
  content: TemplateRef<void>;

  ngOnChanges() {
    const content: EmbeddedViewRef<void> = this.content.createEmbeddedView();
    const contentNodes: Node[] = content.rootNodes;
    console.log(contentNodes);
    ReactDOM.render(
      React.createElement(this.component, this.props, contentNodes.map(node => React.createElement(
        nativeNodeToReactComponent(node),
      ))),
      this._eRef.nativeElement,
    );
  }
}
