import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Collapse } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const { Panel } = Collapse;
const CollapseWithMarkdown = ({ markdownContent }) => {
    const questionsAndAnswers = markdownContent
        .split('### ')
        .filter((item) => item !== '')
        .map((item) => {
            const [question, ...answerLines] = item.split('\n').filter((line) => line !== '');
            const answer = answerLines.join('\n');
            return { question, answer };
        });

    return (
        <>
            <Collapse accordion>
                {questionsAndAnswers.map(({ question, answer }, index) => (
                    <Panel header={<div>{question}</div>} key={index}>
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <SyntaxHighlighter

                                            language={match[1]}
                                            PreTag="div"
                                            children={String(children).replace(/\n$/, '')}
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {answer}
                        </ReactMarkdown>
                    </Panel>
                ))}
            </Collapse>
        </>

    );
};

export default CollapseWithMarkdown;