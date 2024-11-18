import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('custom/accordion', {
    title: __('Accordion', 'accordion-block'),
    icon: 'list-view',
    category: 'widgets',
    supports: {
        html: false,
    },
    edit: (props) => {
        const blockProps = useBlockProps();

        return (
            <div { ...blockProps }>
                <InnerBlocks
                    allowedBlocks={['custom/accordion-item']}
                    template={[['custom/accordion-item']]}
                    templateLock={false}
                />
            </div>
        );
    },
    save: (props) => {
        const blockProps = useBlockProps.save();

        return (
            <div { ...blockProps } className="accordion" role="tablist">
                <InnerBlocks.Content />
            </div>
        );
    },
});

registerBlockType('custom/accordion-item', {
    title: __('Accordion Item', 'accordion-block'),
    icon: 'list-view',
    category: 'widgets',
    parent: ['custom/accordion'],
    attributes: {
        title: {
            type: 'string',
            source: 'text',
            selector: '.accordion-item-title',
            default: __('Accordion Title', 'accordion-block')
        },
        content: {
            type: 'string',
            source: 'html',
            selector: '.accordion-item-content',
            default: ''
        }
    },
    edit: (props) => {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        return (
            <div { ...blockProps } className="accordion-item" role="tabpanel">
                <InspectorControls>
                    <PanelBody title={__('Accordion Item Settings', 'accordion-block')} initialOpen={true}>
                        <TextControl
                            label={__('Accordion Title', 'accordion-block')}
                            value={attributes.title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <RichText tagName="div" className="accordion-item-title" value={attributes.title} onChange={(value) => setAttributes({ title: value })} placeholder={__('Accordion Title', 'accordion-block')} role="tab" aria-expanded="false" tabIndex="0" onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { const content = event.target.nextElementSibling; const expanded = event.target.getAttribute('aria-expanded') === 'true'; event.target.setAttribute('aria-expanded', !expanded); content.setAttribute('aria-hidden', expanded); } }} />
                <div className="accordion-item-content" role="region" aria-hidden="true" tabIndex="0">
                    <RichText
                        tagName="div"
                        className="accordion-item-content"
                        value={attributes.content}
                        onChange={(value) => setAttributes({ content: value })}
                        placeholder={__('Add accordion content...', 'accordion-block')}
                    />
                </div>
            </div>
        );
    },
    save: (props) => {
        const { attributes } = props;
        const blockProps = useBlockProps.save();

        return (
            <div { ...blockProps } className="accordion-item" role="tabpanel">
                <div className="accordion-item-title">
                    {attributes.title}
                </div>
                <div className="accordion-item-content" role="region" aria-hidden="true" tabIndex="0">
                    <RichText.Content tagName="div" value={attributes.content} />
                </div>
            </div>
        );
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item-title');

    accordionItems.forEach((item) => {
        item.addEventListener('click', () => {
            const parent = item.closest('.accordion-item');
            const isOpen = parent.classList.contains('open');

            // Close all accordion items
            document.querySelectorAll('.accordion-item.open').forEach((openItem) => {
                openItem.classList.remove('open');
                openItem.querySelector('.accordion-item-title').setAttribute('aria-expanded', 'false');
                openItem.querySelector('.accordion-item-content').style.display = 'none';
            });

            // Toggle current accordion item
            if (!isOpen) {
                parent.classList.add('open');
                item.setAttribute('aria-expanded', 'true');
                parent.querySelector('.accordion-item-content').style.display = 'block';
            } else {
                parent.classList.remove('open');
                item.setAttribute('aria-expanded', 'false');
                parent.querySelector('.accordion-item-content').style.display = 'none';
            }
        });
    });
});
